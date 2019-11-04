import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../tableIcons';

const DisplayEntity = (props) => {
  const columns = props.fields.map(field => {
    return {
      title: field.label,
      field: field.name
    }
  });
  
  const [state, setState] = React.useState({
    columns: columns,
    data: Object.keys(props.entities).map(key => {
      return { ...props.entities[key], id: key };
    })
  });

  const entityLabel = props.name.slice(0, -1);
  const formatedLabel = entityLabel.charAt(0).toUpperCase() + entityLabel.slice(1, entityLabel.length);

  React.useEffect(() => {
    const newData = Object.keys(props.entities).map(key => {
      return { ...props.entities[key], id: key };
    });

    setState({ ...state, data: newData });
  }, [props.entities]);

  return (
    <MaterialTable
      icons={tableIcons}
      title=""
      columns={state.columns}
      data={state.data}
      editable={
        {
          onRowDelete: oldData =>
            new Promise(resolve => {
              if (props.findServiceByEntityId(oldData.id, props.name)) {
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
                props.deleteEntity(oldData.id, props.name);
                props.showSnackbar(props.name, 'deleted');
              }, 300);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();

                for ( const field of props.fields) {
                    if ( field.calculated ) {
                        const str = field.calculated.map(item => {
                            return newData[item];
                        }).join(' ');
                        
                        newData[field.name] = str;
                    }
                }

                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
                props.updateEntity(newData, newData.id, props.name);
                props.showSnackbar(props.name, 'updated');
              }, 300);
            }),
        }
      }
    />
  );
}

export default DisplayEntity;