import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Stack, TextField } from "@mui/material"
import { useState } from "react"


export default function AddressForm(props) {
    const [open, setOpen] = useState(false)
    const openHandler = () => {
        setAddress({zip: '', addr: ''})
        setOpen(true)
    }
    const closeHandler = () => {
        setAddress({zip: '', addr: ''})
        setOpen(false)
    }
    const [address, setAddress] = useState({zip: '', addr: ''})
    const changeHandler = e => {
        setAddress({...address, [e.target.name]:e.target.value})
        //console.log(`address.zip: ${address.zip}, address.addr: ${address.addr}`);
    }
    const saveHandler = () => {
        props.addAddress(address)
        closeHandler()
    }
    return(
        <div>
            <Button variant = 'contained' onClick={openHandler}>입력</Button>
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
                    <Button onClick={saveHandler}>저장</Button>
                </DialogActions>
            </Dialog>
        </div>
    )   
}