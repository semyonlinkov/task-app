import React from 'react';
import styles from './ChooseObjectPopUp.module.scss';
import ImgClose from '../../../img/closeRed64.png';

const ChooseObjectPopUp = ({ customers, setValue, setShowObjectsPopUp, setWhosePhoneName }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<p>Выберите адресс объекта</p>
				<img onClick={setShowObjectsPopUp} src={ImgClose} alt="back" />
			</div>
			<ol className={styles.list_wrapper}>
				{/* <li className={styles.address_wrapper} onClick={setShowObjectsPopUp}>
					<p className={styles.number}>1</p>
					<p className={styles.address}>Без объекта</p>
				</li> */}
				{customers.OBJ?.map((obj, i) => (
					<li
						className={styles.address_wrapper}
						key={obj.ObjectNumber}
						onClick={() => {
							const number = +obj.ObjectNumber;

							setValue('objectAdress', obj.Address);
							setValue('objectName', obj.Name);
							setValue('fullname', customers.CUST.find((cust) => obj.ObjectID === cust.ObjectID).ObjCustName);
							setValue('objectNumber', number.toString(16));
							setWhosePhoneName();
							setShowObjectsPopUp();
						}}>
						<p className={styles.number}>{i + 1}</p>
						<p className={styles.address}>{obj.Address}</p>
					</li>
				))}
			</ol>
		</div>
	);
};

export default ChooseObjectPopUp;
