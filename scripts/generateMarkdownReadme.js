import axios from "axios";
import { markdownTable } from "markdown-table";
import { readFile, writeFile } from "fs/promises";

const apiPath = "http://localhost:4000";
const pathToReadMe = "../ReadMe.md";

const fetchProducts = async () => {
	const res = await axios.get(`${apiPath}/api/products`);
	return res.data.map((product) => [product.name, product._id]);
};

const fetchCategories = async () => {
	const res = await axios.get(`${apiPath}/api/categories`);
	return res.data.map((category) => [category.name, category._id]);
};

const generateTable = (title, data) => {
	return `\n### ${title}\n\n` + markdownTable([["Name", "Id"], ...data]) + "\n";
};

const generateIdDocumentation = async () => {
	const products = await fetchProducts();
	const categories = await fetchCategories();

	const newContent =
		"\n<!-- ids:start -->" +
		generateTable("Categories", categories) +
		generateTable("Products", products) +
		"<!-- ids:end -->\n";

	const oldContent = await readFile(pathToReadMe, "utf-8");
	const updatedContent = oldContent.replace(/(<!-- ids:start -->)[\s\S]*(<!-- ids:end -->)/, newContent);

	await writeFile(pathToReadMe, updatedContent);
};

const fetchEndpoints = async () => {
	const res = await axios.get(`${apiPath}/api/docs`);
	const endpoints = res.data;

	console.log(endpoints[0].parameters);

	endpoints.forEach((endpoint) => {
		endpoint.parameters.forEach((param) => {
			if (param.in === "body") {
				param.type = "Request Body";
			} else if (param.in === "query") {
				param.type = "Query Params";
			} else if (param.in === "path") {
				param.type = "Path Params";
			}
		});
	});

	return endpoints;
};

const generateEndpointDocumentation = async () => {
	const endpoints = await fetchEndpoints();

	const endpointTable = endpoints.map((endpoint) => {
		const { method, path, summary, parameters, responses } = endpoint;

		const requestBodyNames = parameters.filter((param) => param.location === "body").map((param) => param.name);
		const queryParamNames = parameters.filter((param) => param.location === "query").map((param) => param.name);
		const pathParamNames = parameters.filter((param) => param.location === "path").map((param) => param.name);

		const requestBodyParam = requestBodyNames.length ? requestBodyNames.join(", ") : "";
		const queryParam = queryParamNames.length ? queryParamNames.join(", ") : "";
		const pathParam = pathParamNames.length ? pathParamNames.join(", ") : "";

		const responseStatus = responses.length ? responses[0].status : "";

		return `| ${method} | ${path} | ${requestBodyParam} | ${queryParam} | ${pathParam} | ${responseStatus} | ${summary} |`;
	});

	const tableHeader = "| Method | Path | Request Body | Query Params | Path Params | Response | Summary |";
	const tableDivider = "| ------ | ---- | ------------ | ------------ | ----------- | -------- | ------- |";
	const markdownTable = [tableHeader, tableDivider, ...endpointTable].join("\n");

	const oldContent = await readFile(pathToReadMe, "utf-8");
	const updatedContent = oldContent.replace(
		/<!-- endpoints:start -->([\s\S]*?)<!-- endpoints:end -->/,
		`<!-- endpoints:start -->\n${markdownTable}\n<!-- endpoints:end -->`
	);

	await writeFile(pathToReadMe, updatedContent);
};

await generateEndpointDocumentation();
await generateIdDocumentation();
