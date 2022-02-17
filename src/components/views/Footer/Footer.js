import clsx from 'clsx';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
    //     <Container>
    //         <footer className={clsx("footer fixed-bottom", "justify-content-center")}>
    //             Copyright © waiter.app 2022 
    //         </footer>
    //   </Container>
        
            <Container className="bg-light text-center text-lg-start footer fixed-bottom rounded">
    
                <div className="text-center p-3" >
                    Copyright © waiter.app 2022
                </div>
            </Container>
    
    )
}

export default Footer;