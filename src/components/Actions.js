import React from 'react';
import Header from './Header';
import Body from './Body';
import DisplayEntity from './DisplayEntity';
import CreateEntity from './CreateEntity';
import CreateEntityButton from './CreateEntityButton';
import Popup from './Popup';

const Actions = (props) => {
	const [state, setState] = React.useState({
		showPopup: false
	});

	const hidePopup = () => {
		setState({ ...state, showPopup: false });
	}

	const showPopup = () => {
		setState({ ...state, showPopup: true });
	}

	const fields = props.fields.actions;

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

export default Actions;