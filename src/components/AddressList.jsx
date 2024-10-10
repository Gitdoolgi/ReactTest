import { useEffect, useState } from "react";
import { REST_URL } from "../constants";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Snackbar, Stack } from "@mui/material";
import AddressForm from "./AddressForm";
import AddressEdit from "./AddressEdit";
import { DeleteTwoTone } from "@mui/icons-material";

export default function AddressList(){
    //const [addresses, setAddresses] = useState([{zip:'000000', name:'길동', rdate:'2024', update:'2025'}])
    const [addresses, setAddresses] = useState([])

    useEffect(() => fetchAddress, [])

    const fetchAddress = () => {
    const token = sessionStorage.getItem('jwt')
    fetch(REST_URL+'api/readdresses',{headers: {'Authorization':token}})
    .then(response => response.json())
    .then(data=> setAddresses(data._embedded.readdresses))
    .catch(err => console.log(err))
    }

    const columns = [
        {field: 'zip', headerName:'우편번호', width:250},
        {field: 'addr', headerName:'주소', width:250},
        {field: 'rdate', headerName:'등록일', width:250},
        {field: 'udate', headerName:'수정일', width:250},
        {
            field:'_links.readdress.href',
            headerName:'',
            sortable: false,
            filterable: false,
            renderCell: row => <AddressEdit data = {row} editAddress = {editAddress} />
        },
        {
            field:'_links.self.href',
            headerName:'',
            sortable: false,
            filterable: false,
            renderCell: row => <IconButton onClick={()=> delHandler(row.id)}><DeleteTwoTone color='error'></DeleteTwoTone> </IconButton>
        }
    ]
    
    const delHandler = (url) => {
        if(window.confirm('진짜로?')){
            const token = sessionStorage.getItem('jwt')
            
            fetch(url, {method: 'DELETE', headers: {'Authorization':token}})
            .then(response => {
                if(response.ok){
                    fetchAddress()
                    setOpen(true)
                }else{
                    alert('먼가..먼가읾,,')
                }
            })
            .catch(err => console.error(err))
        }
    }
    const [open, setOpen] = useState(false)

    const addAddress = (address) => {
        const token = sessionStorage.getItem('jwt')
        fetch(REST_URL+'api/readdresses', {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'Authorization': token},
            body: JSON.stringify(address)
        })
        .then(response => {
            if(response.ok){
                fetchAddress()
            }else{
                alert("실패")
            }
        })
        .catch(err => console.error(err))
    }

    const editAddress = (address, link) => {
        const token = sessionStorage.getItem('jwt')
        fetch(link,{
            method: 'PUT',
            headers: {'Content-Type':'application/json', 'Authorization': token},
            body: JSON.stringify(address)
        })
        .then(response=>{
            if(response.ok){
                fetchAddress()
            }else{
                alert('오류발생');
            }
        })
        .catch(err => console.error(err))
    }

    const logout = () => {
        sessionStorage.clear('jwt')
        return <Login/>
        // const token = sessionStorage.getItem('jwt')
        // fetch(REST_URL+'logout' , {
        //     method: 'POST',
        //     headers: {'Content-Type':'application/json', 'Authorization':'token'}
        // })
        // .then(response => {
        //     const auth = response.headers.get('Authrization')
        //     if(auth !== null){
        //         sessionStorage.clear
        //     }
        // })
        // .catch(err=>{
        //     console.error(err);
        // }) 
    }

    return (
        <>
        <Stack mt={2} mb={2}>
        <AddressForm addAddress = {addAddress}/>
        <Button color="primary" variant="outlined" onClick={logout}>로그아웃</Button>
        </Stack>
        <div style = {{height:500, width:'100%'}}>
            <DataGrid rows={addresses} columns={columns}
            getRowId={row => row._links.self.href}
            disableRowSelectionOnClick={true}
            sx={{
                '& .MuiDataGrid-cell': {
                    backgroundColor: 'white', // 셀 배경색을 흰색으로 설정
                }}}/>

            <Snackbar
                autoHideDuration={2000}
                message='삭제 완료'
                open={open}
                onClose={()=>setOpen(false)}/>

            {/* <table>
                <tbody>
                    {
                        addresses.map((address,index) => 
                        <tr key={index}>
                            <td>{address.zip}</td>
                            <td>{address.addr}</td>
                            <td>{address.rdate}</td>
                            <td>{address.update}</td>
                        </tr>
                        )
                    }
                </tbody>
            </table> */}
        </div>
        </>
    )
}
