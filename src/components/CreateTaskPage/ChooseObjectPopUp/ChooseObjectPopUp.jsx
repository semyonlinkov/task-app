import React from 'react';
import styles from './ChooseObjectPopUp.module.scss';
import Cross from '../../../img/cross-2.png';

const ChooseObjectPopUp = ({ customers, setShowObjectPopUp, setValue }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<p>Выберите адресс объекта</p>
				<img onClick={setShowObjectPopUp} src={Cross} alt="back" />
			</div>
			<ol className={styles.list_wrapper}>
				<li className={styles.address_wrapper} onClick={setShowObjectPopUp}>
					<p className={styles.number}>1</p>
					<p className={styles.address}>Без объекта</p>
				</li>
				{customers.OBJ?.map((obj, i) => (
					<li
						className={styles.address_wrapper}
						key={obj.ObjectNumber}
						onClick={() => {
							setValue('objectAdress', obj.Address);
							setValue('objectName', obj.Name);
							setValue('fullname', customers.CUST.find((cust) => obj.ObjectID === cust.ObjectID).ObjCustName);
							setShowObjectPopUp();
						}}>
						<p className={styles.number}>{i + 2}</p>
						<p className={styles.address}>{obj.Address}</p>
					</li>
				))}
			</ol>
		</div>
	);
};

export default ChooseObjectPopUp;