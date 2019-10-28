import React from 'react';
import Header from './Header';
import Body from './Body';
import DisplayEntity from './DisplayEntity';
import CreateEntity from './CreateEntity';
import CreateEntityButton from './CreateEntityButton';
import Popup from './Popup';

const Customers = (props) => {
	const [state, setState] = React.useState({
		showPopup: false
	});

	const hidePopup = () => {
		setState({ ...state, showPopup: false });
	}

	const showPopup = () => {
		setState({ ...state, showPopup: true });
	}

	const renderPopup = () => {
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
				<Popup hidePopup={hidePopup}>
					<CreateEntity
						name=""
						addEntity={props.addEntity}
						stateName="customers"
						fields={fields}
						isMulti={false}
						isDirect={true}
						hidePopup={hidePopup}
					/>
				</Popup>
			);
		}
	}
	return (
		<React.Fragment>
			{renderPopup()}
			<Header title="Customers">
				<CreateEntityButton showPopup={showPopup} entity="customers" />
			</Header>
			<Body>
				<DisplayEntity
					customers={props.customers}
					deleteEntity={props.deleteEntity}
					findServiceByCustomerId={props.findServiceByCustomerId}
					updateEntity={props.updateEntity}
				/>
			</Body>
		</React.Fragment>
	);
}

export default Customers;