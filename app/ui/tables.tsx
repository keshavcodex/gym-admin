import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAllUsers, getUser } from '../lib/apiService';
import { Delete, ModeEditOutlineOutlined } from '@mui/icons-material';

const columns: GridColDef<any>[] = [
	{ field: '_id', headerName: 'userId', width: 250 },
	{
		field: 'firstName',
		headerName: 'First name',
		width: 150
	},
	{
		field: 'lastName',
		headerName: 'Last name',
		width: 150
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 150
	},
	{
		field: 'phone',
		headerName: 'Phone',
		width: 150,
	},
	{
		field: 'action',

		renderCell() {
			return (
				<Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 1.5 }}>
					<Delete color='error' />
					<ModeEditOutlineOutlined />
				</Box>
			);
		},
		headerAlign: 'center',
		headerName: 'Action',
		width: 100
	}

	// {
	// 	field: 'fullName',
	// 	headerName: 'Full name',
	// 	description: 'This column has a value getter and is not sortable.',
	// 	sortable: false,
	// 	width: 160,
	// 	valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
	// }
];

export default function DataGridDemo() {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await getAllUsers();
			setRows(response);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<Box sx={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={rows}
				getRowId={(row) => row._id}
				loading={loading}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5
						}
					}
				}}
				pageSizeOptions={[5]}
				checkboxSelection
				disableRowSelectionOnClick
			/>
		</Box>
	);
}
