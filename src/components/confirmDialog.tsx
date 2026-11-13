import React from 'react'
import { 
        Button,
        AlertDialog,
        AlertDialogOverlay,
        AlertDialogContent,
        AlertDialogHeader,
        AlertDialogBody,
        AlertDialogFooter

} from '@chakra-ui/react'

interface Props {title?:string, description?:string, isOpen?: boolean, handleCLick?: any, handleCLickClose?: any}


const ConfirmDialog = (props: Props) => {
        const cancelRef = React.useRef<HTMLButtonElement>(null)
        return(
            <AlertDialog
                isOpen={props.isOpen}
                leastDestructiveRef={cancelRef}
                onClose={props.handleCLickClose}
                isCentered
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
                        <Button mr="5" backgroundColor="gray.500" color="whiteAlpha.900" onClick={props.handleCLickClose}>Cancel</Button>
                        <Button backgroundColor="messenger.500" color="whiteAlpha.900" onClick={props.handleCLick}>Confirm</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    
export default ConfirmDialog