import React, { useState } from 'react';
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
import GridBasic from '../components/UI/GridBasic';
import TopBar from '../components/UI/TopBar';

const History = (props) => {
	/** Destructuring the props **/
	const {
		services,
		getCustomerNameById,
		getDeviceById,
		getActionNameById,
		filterServices,
		sortServices,
		deleteService
	} = props;

	/** Setting up the state **/
	const [state, setState] = React.useState({
		showPopup: false,
		popupServiceId: '',
		searchText: '',
		sortCriteria: '',
		sortDirectionAsc: true,
		promptedId: null,
	});

	/** Custom methods for updating the sortCriteria and promptedId states **/
	const updateSortCriteria = (value) => setState({
		...state,
		sortCriteria: value
	});

	const updatePromptedId = (value) => setState({
		...state,
		promptedId: value
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
			setState({
				...state,
				searchText: value
			});
		}, 500);
	}

	const handleSortCriteriaChange = (value) => {
		setState({
			...state,
			sortCriteria: value
		});
	}

	const handleSortDirectionClick = () => {
		setState({
			...state,
			sortDirectionAsc: !state.sortDirectionAsc
		});
	}

	/** Render Methods **/
	const renderServices = () => {
		if (state.sortCriteria === '') return;
		const filteredArr = [];

		// First we filter services and populate filteredArr with keys
		for (const serviceKey of Object.keys(services)) {
			if (filterServices(services[serviceKey], state.searchText)) {
				filteredArr.push(serviceKey);
			}
		}

		// After filtering, we are sorting the array
		sortedArr = sortServices(filteredArr, state.sortCriteria, state.sortDirectionAsc);
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
		if (state.promptedId) {
			return (
				<DeletePrompt
					id={state.promptedId}
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
			<Header title="Services History" />
			<Body>
				<TopBar>
					<Legend />
					<Controls
						handleSearchInputChange={handleSearchInputChange}
						handleSortCriteriaChange={handleSortCriteriaChange}
						handleSortDirectionClick={handleSortDirectionClick}
						updateSortCriteria={updateSortCriteria}
						sortDirectionAsc={state.sortDirectionAsc}
					/>
				</TopBar>
				<GridBasic>
					{renderServices()}
				</GridBasic>
				{renderUpdateServicePopup()}
			</Body>
		</React.Fragment>
	);
}

export default History;
