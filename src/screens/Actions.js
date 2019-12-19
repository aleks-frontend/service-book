import React from 'react';
import Header from '../components/UI/Header';
import Body from '../components/UI/Body';
import DisplayEntity from '../components/DisplayEntity';
import CreateEntity from '../components/CreateEntity';
import CreateEntityButton from '../components/UI/CreateEntityButton';
import Popup from '../components/UI/Popup';
import { AppContext } from '../AppContext';
import { fields } from '../helpers';

const ScreensActions = (props) => {
	const context = React.useContext(AppContext);
	
	/** Setting up the state **/
	const [state, setState] = React.useState({
		showPopup: false
	});

	/** Helper methods for hiding the showing the popup **/
	const hidePopup = () => setState({ ...state, showPopup: false });
	const showPopup = () => setState({ ...state, showPopup: true });

	const actionsFields = fields.actions;

	/** Render Methods **/
	const renderPopup = () => {
		if (state.showPopup) {
			return (
				<Popup hidePopup={hidePopup}>
					<CreateEntity
						name=""
						stateName="actions"
						fields={actionsFields}
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
			<Header title="Actions">
				<CreateEntityButton showPopup={showPopup} entity="actions" />
			</Header>
			<Body>
				<CreateEntityButton
					entity="Action"
					showPopup={showPopup}
					injectIntoTable={true} />
				<DisplayEntity
					name="actions"
					fields={actionsFields}
					entities={context.state.ssot.actions}
					showSnackbar={props.showSnackbar}
				/>
			</Body>
		</React.Fragment>
	);
}

export default ScreensActions;