import React from 'react';
import Header from './Header';
import Body from './Body';
import DisplayEntity from './DisplayEntity';
import CreateEntity from './CreateEntity';
import Overlay from './Overlay';

const Customers = (props) => {
	const [state, setState] = React.useState({
		showPopup: false
	});

	const hidePopup = () => {
		setState({ ...state, showPopup: false });
	}

	const renderOverlay = () => {
		const fields = [
			{
				name: 'name',
				label: 'Name',
				defaultVal: '',
				required: true
			},
			{
				name: 'phone',
				label: 'Phone',
				defaultVal: 0,
				required: false
			},
			{
				name: 'email',
				label: 'Email',
				defaultVal: '',
				required: true
			}
		];
		if (state.showPopup) {
			return (
				<Overlay hidePopup={hidePopup}>
					<CreateEntity
						name=""
						addEntity={props.addEntity}
						stateName="customers"
						fields={fields}
						isMulti={false}
						isDirect={true}
						hidePopup={hidePopup}
					/>
				</Overlay>
			);
		}
	}
	return (
		<React.Fragment>
			{renderOverlay()}
			<Header title="Customers" />
			<Body>
				<DisplayEntity
					customers={props.customers}
					deleteEntity={props.deleteEntity}
					findServiceByCustomerId={props.findServiceByCustomerId}
				/>
				<button onClick={() => setState({ ...state, showPopup: true })}>Create Customer</button>
			</Body>
		</React.Fragment>
	);
}

export default Customers;