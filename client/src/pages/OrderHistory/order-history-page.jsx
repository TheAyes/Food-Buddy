import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./order-history-page.module.scss";


export const OrderHistoryPage = () => {
	return (
		<>
			<section className={styles.orderHistory}>
				<div className={styles.headerOrderHistory}>
					<GoBackButton />
					<h4>Order History</h4>
				</div>
				<div className={styles.listContainer}>
					<a href="#" className={styles.listAll}>All</a>
				</div>
				<div className={styles.allOrders}>
					<article className={styles.orderBox}>
						<p className={styles.orderNumber}>EW878965</p>
						<div className={styles.orderStatus}>
							<p className={styles.ocPending}>Pending</p>
							<p className={styles.ocPaid}>Paid</p>
						</div>
						<p className={styles.priceIndicator}>53,50 €</p>
						<p className={styles.dateIndicator}>25 June, 11:22am</p>
					</article>
					<article className={styles.orderBox}>
						<p className={styles.orderNumber}>SD458963</p>
						<div className={styles.orderStatus}>
							<p className={styles.ocProcessing}>Processing</p>
							<p className={styles.ocPaid}>Paid</p>
						</div>
						<p className={styles.priceIndicator}>78,33 €</p>
						<p className={styles.dateIndicator}>28 June, 4:34pm</p>
					</article>
					<article className={styles.orderBox}>
						<p className={styles.orderNumber}>WS589632</p>
						<div className={styles.orderStatus}>
							<p className={styles.ocCanceled}>Canceled</p>
							<p className={styles.ocRefunded}>Refunded</p>
						</div>
						<p className={styles.priceIndicator}>224,97 €</p>
						<p className={styles.dateIndicator}>1 July, 8:32pm</p>
					</article>
					<article className={styles.orderBox}>
						<p className={styles.orderNumber}>QW458963</p>
						<div className={styles.orderStatus}>
							<p className={styles.ocPicked}>Picked</p>
							<p className={styles.ocPaid}>Paid</p>
						</div>
						<p className={styles.priceIndicator}>65,87 €</p>
						<p className={styles.dateIndicator}>3 July, 9:45am</p>
					</article>
					<article className={styles.orderBox}>
						<p className={styles.orderNumber}>EW878965</p>
						<div className={styles.orderStatus}>
							<p className={styles.ocShipped}>Shipped</p>
							<p className={styles.ocRefunded}>Refunded</p>
						</div>
						<p className={styles.priceIndicator}>377,65 €</p>
						<p className={styles.dateIndicator}>4 July, 2:32pm</p>
					</article>
				</div>
				<NavBar />
			</section>
		</>
	)
};
