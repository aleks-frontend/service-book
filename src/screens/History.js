import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Header from '../components/UI/Header';
import Body from '../components/UI/Body';
import HistoryCard from '../components/HistoryCard';
import ServiceForm from '../components/ServiceForm';
import Controls from '../components/UI/Controls';
import DeletePrompt from '../components/UI/DeletePrompt';
import Popup from '../components/UI/Popup';
import PrintPopup from '../components/UI/PrintPopup';
import Legend from '../components/UI/Legend';
import GridBasic from '../components/UI/GridBasic';
import TopBar from '../components/UI/TopBar';
import FilterCriteriaEmpty from '../components/UI/FilterCriteriaEmpty';
import { AppContext } from '../AppContext';
import { fields } from '../helpers';

const History = (props) => {
	const context = React.useContext(AppContext);

	/** Setting up the state **/
	const [state, setState] = React.useState({
		showPopup: false,
		popupServiceId: '',
		searchText: '',
		sortCriteria: '',
		sortDirectionAsc: true,
		promptedId: null,
		statusFilters: context.state.filteredServicesArray,
		showNoServiceMessage: false,
		showPrintPopup: false,
		printInputs: {
			customerId: [],
			deviceIds: [],
			title: '',
			remark: ''
		}
	});

	React.useEffect(() => {
		context.setFilteredServicesArray([]);
	}, []);

	// const 

	/** Custom methods for updating the statusFilters state **/
	const updateStatusFilters = (value) => {
		let statusFiltersStateCopy = [...state.statusFilters];

		if (statusFiltersStateCopy.includes(value)) {
			statusFiltersStateCopy = statusFiltersStateCopy.filter(status => (status !== value));
		} else {
			statusFiltersStateCopy.push(value);
		}

		setState({
			...state,
			statusFilters: statusFiltersStateCopy
		});
	};

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

	/** Helper methods for hiding the showing the print popup **/
	const hidePrintPopup = () => setState({ ...state, showPrintPopup: false });
	const showPrintPopup = ({ serviceId, customerId, deviceIds, title, actions, newDevices, remark, description }) => {
		setState({
			...state,
			showPrintPopup: true,
			printInputs: {
				serviceId,
				customerId,
				deviceIds,
				title,
				actions,
				newDevices,
				remark,
				description
			}
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
	const renderServices = (context) => {
		if (state.sortCriteria === '') return;
		const filteredArr = [];

		// First we filter services and populate filteredArr with keys
		for (const serviceKey of Object.keys(context.state.ssot.services)) {
			if (context.filterServices(context.state.ssot.services[serviceKey], state.searchText, state.statusFilters)) {
				filteredArr.push(serviceKey);
			}
		}

		// Checking if no service matches the searched text
		if (filteredArr.length === 0 && props.mainStateIsLoaded) {
			if (state.showNoServiceMessage === false) {
				setState({
					...state,
					showNoServiceMessage: true
				});
			}
		} else {
			if (state.showNoServiceMessage === true) {
				setState({
					...state,
					showNoServiceMessage: false
				});
			}
		}

		// After filtering, we are sorting the array
		sortedArr = context.sortServices(filteredArr, state.sortCriteria, state.sortDirectionAsc);
		return sortedArr.map(key => renderHistoryCard(context.state.ssot.services[key], key));
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
				updatePromptedId={updatePromptedId}
				renderUpdateServicePopup={renderUpdateServicePopup}
				showPopup={showPopup}
				showPrintPopup={showPrintPopup}
			/>
		</CSSTransition>
	);

	const renderDeletePrompt = () => {
		if (state.promptedId) {
			return (
				<DeletePrompt
					id={state.promptedId}
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
						showSnackbar={props.showSnackbar}
						fields={fields}
						service={context.state.ssot.services[state.popupServiceId]}
						serviceId={state.popupServiceId}
						hidePopup={hidePopup}
					/>
				</Popup>
			)
		}
	}

	const renderPrintPopup = () => {
		if (state.showPrintPopup) {
			return (
				<Popup hidePopup={hidePrintPopup}>
					<PrintPopup
						serviceId={state.printInputs.serviceId}
						customerId={state.printInputs.customerId}
						deviceIds={state.printInputs.deviceIds}
						title={state.printInputs.title}
						actions={state.printInputs.actions}
						newDevices={state.printInputs.newDevices}
						remark={state.printInputs.remark}
						description={state.printInputs.description}
						getDeviceNameById={props.getDeviceNameById}
						getCustomerObjById={props.getCustomerObjById}
						getActionNameById={props.getActionNameById}
						hidePopup={hidePrintPopup}
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
					<Legend
						updateStatusFilters={updateStatusFilters}
						statusFilters={state.statusFilters}
					/>
					<Controls
						handleSearchInputChange={handleSearchInputChange}
						handleSortCriteriaChange={handleSortCriteriaChange}
						handleSortDirectionClick={handleSortDirectionClick}
						updateSortCriteria={updateSortCriteria}
						sortDirectionAsc={state.sortDirectionAsc}
					/>
				</TopBar>
				{state.showNoServiceMessage && <FilterCriteriaEmpty>No service meets the filtered criteria!</FilterCriteriaEmpty>}
				<GridBasic>
					{renderServices(context)}
				</GridBasic>
				{renderUpdateServicePopup()}
				{renderPrintPopup()}
			</Body>
		</React.Fragment>
	);
}

export default History;
