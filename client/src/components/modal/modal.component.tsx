import './modal.component.css';
import { GiCheckMark } from 'react-icons/gi';
const ModalComponent = () => {
	return (
		<div>
			<dialog
				id="my_modal_5"
				className="modal modal-bottom sm:modal-middle">
				<form
					method="dialog"
					className="modal-box">
					<h3 className="font-bold text-lg">
						Success{' '}
						<span>
							{' '}
							<GiCheckMark size={18} />
						</span>
					</h3>
					<p className="py-4">Your report has been posted</p>
					<div className="modal-action">
						<button className="btn">Okay</button>
					</div>
				</form>
			</dialog>
		</div>
	);
};

export default ModalComponent;
