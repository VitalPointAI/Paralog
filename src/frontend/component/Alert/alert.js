import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

const AlertDismissible = ({ show }) => {
    if (show) {
        return (
            <Message warning icon>
            <Icon name='warning sign' />
            <Message.Content>
                <Message.Header>
                We are currently in development
                </Message.Header>
                Play around - but you'll have to start over when we launch. Stay tuned for the announcement.
            </Message.Content>
            </Message>
        );
    }
}

export default AlertDismissible