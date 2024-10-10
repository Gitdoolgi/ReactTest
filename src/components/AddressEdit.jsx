import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit'

export default function AddressEdit(props){
    const [open, setOpen] = useState(false)
    const openHandler = () => {
        setAddress({zip:props.data.row.zip, addr:props.data.row.addr})
        setOpen(true)
    }
    const closeHandler = () => {
        setOpen(false)
    }
    const [address, setAddress] = useState({zip: '', addr: ''})
    const changeHandler = e => {
        setAddress({...address, [e.target.name]:e.target.value})
        //console.log(`address.zip: ${address.zip}, address.addr: ${address.addr}`);
    }

    const editHandler = () => {
        props.editAddress(address, props.data.id)
        closeHandler()
    }

    return (
        <>

            <IconButton onClick={openHandler}><EditIcon color='primary'/></IconButton>
            <Dialog open={open} onClose={closeHandler}>
            <DialogTitle>새 주소</DialogTitle>
                <DialogContent>
                    <Stack spacing={1} mt={1}>
                    <TextField label="우편번호" name='zip' autoFocus = 'true' variant="standard"
                    value={address.zip} onChange={changeHandler}/><br/>
                    <TextField label="주소" name ='addr' variant="standard"
                    value={address.addr} onChange={changeHandler}/><br/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeHandler}>취소</Button>
                    <Button onClick={editHandler}>수정</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}