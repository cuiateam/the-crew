import React from 'react'
import { 
        Button,
        AlertDialog,
        AlertDialogOverlay,
        AlertDialogContent,
        AlertDialogHeader,
        AlertDialogBody,
        AlertDialogFooter

} from '@chakra-ui/core'

interface Props {title?:string, description?:string, isOpen?: boolean, handleCLick?: any, handleCLickClose?: any}


function ConfirmDialog (props: Props){
        return(
            <AlertDialog
                isOpen={props.isOpen}
                leastDestructiveRef={React.useRef()}                
            >
            
                <AlertDialogOverlay/>
            
                <AlertDialogContent>
                    
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {props.title}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {props.description}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={props.handleCLickClose}>Cancel</Button>
                        <Button backgroundColor="messenger.500" color="whiteAlpha.900" onClick={props.handleCLick}>Confirm</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    
export default ConfirmDialog