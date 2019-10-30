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

	const fields = props.fields.customers;

	const renderPopup = () => {
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
						showSnackbar={props.showSnackbar}
					/>
				</Popup>
			);
		}
	}
	return (
		<React.Fragment>
			{renderPopup()}
			<Header title="Customers">
				<CreateEntityButton 
					showPopup={showPopup} 
					entity="customers"
				/>
			</Header>
			<Body>
				<DisplayEntity
					name="customers"
					fields={fields}
					entities={props.customers}
					findServiceByEntityId={props.findServiceByEntityId}
					deleteEntity={props.deleteEntity}
					updateEntity={props.updateEntity}
					showSnackbar={props.showSnackbar}
				/>
			</Body>
		</React.Fragment>
	);
}

export default Customers;