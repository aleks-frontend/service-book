import React, { useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Header from './Header';
import Body from './Body';
import HistoryCard from './HistoryCard';
import ServiceForm from './ServiceForm';
import Controls from './Controls';
import DeletePrompt from './DeletePrompt';
import Popup from './Popup';
import { fields, breakpoints } from '../helpers';
import Legend from './Legend';

const StyledHistoryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
	grid-auto-rows: 38rem;
	grid-gap: 2rem;
`;

const History = (props) => {
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

	const hidePopup = () => {
		setState({ ...state, showPopup: false });
	}

	const showPopup = (id) => {
		setState({
			...state,
			showPopup: true,
			popupServiceId: id
		});
	}

	let searchTimeout;
	let sortedArr;

	const handleSearchInputChange = (value) => {
		clearTimeout(searchTimeout);

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