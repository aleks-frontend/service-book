import React from 'react';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import tableIcons from '../tableIcons';
import { AppContext } from '../AppContext';

const StyledTableWrapper = styled.div`
  width: 100%;

  .MuiTableCell-root { font-size: 1.1rem; }
  .MuiTypography-caption { font-size: 1rem; }
`;

const DisplayEntity = (props) => {
  const context = React.useContext(AppContext);
  
  /** Populating columns variable with fields received from props **/
  const columns = props.fields.map(field => {
    return {
      title: field.label,
      field: field.name
    }
  });

  /** Setting up the state **/
  const [state, setState] = React.useState({
    columns: columns,
    data: Object.keys(props.entities).map(key => {
      return { ...props.entities[key], id: key };
    })
  });

  /** Generating the entity label **/
  const entityLabel = props.name.slice(0, -1);
  const formatedLabel = entityLabel.charAt(0).toUpperCase() + entityLabel.slice(1, entityLabel.length);

  /** Updating the state on props change **/
  React.useEffect(() => {
    const newData = Object.keys(props.entities).map(key => {
      return { ...props.entities[key], id: key };
    });

    setState({ ...state, data: newData });
  }, [props.entities]);

  return (
    <StyledTableWrapper>
      <MaterialTable
        className="test"
        icons={tableIcons}
        title=""
        columns={state.columns}
        data={state.data}
        editable={
          {
            onRowDelete: oldData =>
              new Promise(resolve => {
                if (context.findServiceByEntityId(oldData.id, props.name)) {
                  resolve();
                  alert(`${formatedLabel} in use`);
                  return;
                }

                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.findIndex((element) => {
                    return element.id === oldData.id;
                  }), 1);
                  setState({ ...state, data });
                  context.deleteEntity(oldData.id, props.name);
                  props.showSnackbar(props.name, 'deleted');
                }, 300);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();

                  for (const field of props.fields) {
                    if (field.calculated) {
                      const str = field.calculated.map(item => {
                        // Specific case when we want to wrap the serial number in 'sn:()'
                        // Used only for devices
                        if ( item === 'serial' && newData[item] !== '' ) {
                          return `sn:(${newData[item]})`;
                        } else {
                          return newData[item];
                        }
                      }).join(' ');

                      newData[field.name] = str;
                    }
                  }

                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  setState({ ...state, data });
                  context.updateEntity(newData, newData.id, props.name);
                  props.showSnackbar(props.name, 'updated');
                }, 300);
              }),
          }
        }
      />
    </StyledTableWrapper>
  );
}

export default DisplayEntity;
