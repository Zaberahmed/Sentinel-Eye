const ToastComponent = () => {
	return (
		<div className="toast toast-top toast-start">
			<div className="alert alert-info">
				<span>Reported Successfully!</span>
			</div>
			<div className="alert alert-success">
				<span>Message sent successfully.</span>
			</div>
		</div>
	);
};

export default ToastComponent;
