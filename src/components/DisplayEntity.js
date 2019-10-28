import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../tableIcons';

const DisplayEntity = (props) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Phone', field: 'phone' },
    ],
    data: Object.keys(props.customers).map(key => {
      return { ...props.customers[key], id: key };
    })
  });

  React.useEffect(() => {
    const newData = Object.keys(props.customers).map(key => {
      return { ...props.customers[key], id: key };
    });

    setState({ ...state, data: newData });
  }, [props.customers]);

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
              if (props.findServiceByCustomerId(oldData.id)) {
                resolve();
                alert('Customer in use');
                return;
              }
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.findIndex((element) => {
                  return element.id === oldData.id;
                }), 1);
                setState({ ...state, data });
                props.deleteEntity(oldData.id);
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                console.log({newData, oldData});
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
                props.updateEntity(newData, newData.id);
              }, 600);
            }),
        }
      }
    />
  );
}

export default DisplayEntity;