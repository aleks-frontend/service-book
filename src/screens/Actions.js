import React from 'react';
import Header from '../components/UI/Header';
import Body from '../components/UI/Body';
import DisplayEntity from '../components/DisplayEntity';
import CreateEntity from '../components/CreateEntity';
import CreateEntityButton from '../components/UI/CreateEntityButton';
import Popup from '../components/UI/Popup';

const ScreensActions = (props) => {
	/** Setting up the state **/
	const [state, setState] = React.useState({
		showPopup: false
	});

	/** Helper methods for hiding the showing the popup **/
	const hidePopup = () => setState({ ...state, showPopup: false });
	const showPopup = () => setState({ ...state, showPopup: true });

	const fields = props.fields.actions;

	/** Render Methods **/
	const renderPopup = () => {
		if (state.showPopup) {
			return (
				<Popup hidePopup={hidePopup}>
					<CreateEntity
						name=""
						addEntity={props.addEntity}
						stateName="actions"
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
					fields={fields}
					entities={props.actions}
					findServiceByEntityId={props.findServiceByEntityId}
					deleteEntity={props.deleteEntity}
					updateEntity={props.updateEntity}
					showSnackbar={props.showSnackbar}
				/>
			</Body>
		</React.Fragment>
	);
}

export default ScreensActions;