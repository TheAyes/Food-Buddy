import { CategoryBarImage } from "../../components/CategoryBarImage/CategoryBarImage";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { ItemList } from "../ItemList/item-list";


export const HomePage = () => {
	return <>
		<SearchBar />
		<CategoryBarImage />
		<ItemList />
	</>;
};
