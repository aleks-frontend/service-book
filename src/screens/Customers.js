import React from 'react';
import Header from '../components/UI/Header';
import Body from '../components/UI/Body';
import DisplayEntity from '../components/DisplayEntity';
import CreateEntity from '../components/CreateEntity';
import CreateEntityButton from '../components/UI/CreateEntityButton';
import Popup from '../components/UI/Popup';
import { AppContext } from '../AppContext';

const ScreensCustomers = (props) => {
	const context = React.useContext(AppContext);
	
	/** Setting up the state **/
	const [state, setState] = React.useState({
		showPopup: false
	});

	/** Helper methods for hiding the showing the popup **/
	const hidePopup = () => setState({ ...state, showPopup: false });
	const showPopup = () => setState({ ...state, showPopup: true });

	const fields = props.fields.customers;

	/** Render Methods **/
	const renderPopup = () => {
		if (state.showPopup) {
			return (
				<Popup hidePopup={hidePopup}>
					<CreateEntity
						name=""
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
				<CreateEntityButton 
					entity="Customer"
					showPopup={showPopup}
					injectIntoTable={true} />
				<DisplayEntity
					name="customers"
					fields={fields}
					entities={context.state.ssot.customers}
					showSnackbar={props.showSnackbar}
				/>
			</Body>
		</React.Fragment>
	);
}

export default ScreensCustomers;