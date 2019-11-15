import React, { useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Header from '../components/UI/Header';
import Body from '../components/UI/Body';
import HistoryCard from '../components/HistoryCard';
import ServiceForm from '../components/ServiceForm';
import Controls from '../components/UI/Controls';
import DeletePrompt from '../components/UI/DeletePrompt';
import Popup from '../components/UI/Popup';
import { fields } from '../helpers';
import Legend from '../components/UI/Legend';

const StyledHistoryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
	grid-auto-rows: 38rem;
	grid-gap: 2rem;
`;

const History = (props) => {
	/** Setting up the state **/
	const [searchText, updateSearchText] = useState('');
	const [sortCriteria, updateSortCriteria] = useState('');
	const [sortDirectionAsc, updateSortDirectionAsc] = useState(true);
	const [promptedId, updatePromptedId] = React.useState(null);
	const {
		services,
		getCustomerNameById,
		getDeviceById,
		getActionNameById,
		filterServices,
		sortServices,
		deleteService
	} = props;

	const [state, setState] = React.useState({
		showPopup: false,
		popupServiceId: ''
	});

	/** Helper methods for hiding the showing the popup **/
	const hidePopup = () => setState({ ...state, showPopup: false });
	const showPopup = (id) => {
		setState({
			...state,
			showPopup: true,
			popupServiceId: id
		});
	}

	let searchTimeout;
	let sortedArr;

	/** Event Handler Methods **/
	const handleSearchInputChange = (value) => {
		clearTimeout(searchTimeout);

		// Adding a setTimeout so the state is not updated on 
		// each key press event while the user is typing
		searchTimeout = setTimeout(() => {
			updateSearchText(value);
		}, 500);
	}

	const handleSortCriteriaChange = (value) => {
		updateSortCriteria(value);
	}

	const handleSortDirectionClick = () => {
		updateSortDirectionAsc(!sortDirectionAsc);
	}

	/** Render Methods **/
	const renderServices = () => {
		if (sortCriteria === '') return;
		const filteredArr = [];

		// First we filter services and populate filteredArr with keys
		for (const serviceKey of Object.keys(services)) {
			if (filterServices(services[serviceKey], searchText)) {
				filteredArr.push(serviceKey);
			}
		}

		// After filtering, we are sorting the array
		sortedArr = sortServices(filteredArr, sortCriteria, sortDirectionAsc);
		return sortedArr.map(key => renderHistoryCard(services[key], key));
	}

	const renderHistoryCard = (service, key) => (
		<CSSTransition
			key={key}
			in={true}
			timeout={500}
			classNames="card"
			unmountOnExit
			appear
		>
			<HistoryCard
				key={key}
				id={key}
				service={service}
				getCustomerNameById={getCustomerNameById}
				getDeviceById={getDeviceById}
				getActionNameById={getActionNameById}
				deleteService={deleteService}
				updatePromptedId={updatePromptedId}
				renderUpdateServicePopup={renderUpdateServicePopup}
				showPopup={showPopup}
			/>
		</CSSTransition>
	);

	const renderDeletePrompt = () => {
		if (promptedId) {
			return (
				<DeletePrompt
					id={promptedId}
					deleteService={deleteService}
					updatePromptedId={updatePromptedId}
				/>);
		}
	}

	const renderUpdateServicePopup = () => {
		if (state.showPopup) {
			return (
				<Popup hidePopup={hidePopup}>
					<ServiceForm
						isUpdate={true}
						customers={props.customers}
						devices={props.devices}
						actions={props.actions}
						updateService={props.updateService}
						addEntity={props.addEntity}
						showSnackbar={props.showSnackbar}
						fields={fields}
						service={props.services[state.popupServiceId]}
						serviceId={state.popupServiceId}
						hidePopup={hidePopup}
					/>
				</Popup>
			)
		}
	}

	return (
		<React.Fragment>
			{renderDeletePrompt()}
			<Header title="Services History">
				<Controls
					handleSearchInputChange={handleSearchInputChange}
					handleSortCriteriaChange={handleSortCriteriaChange}
					handleSortDirectionClick={handleSortDirectionClick}
					updateSortCriteria={updateSortCriteria}
					sortDirectionAsc={sortDirectionAsc}
				/>
			</Header>
			<Body>
				<Legend />
				<StyledHistoryContainer>
					{renderServices()}
				</StyledHistoryContainer>
				{renderUpdateServicePopup()}
			</Body>
		</React.Fragment>
	);
}

export default History;