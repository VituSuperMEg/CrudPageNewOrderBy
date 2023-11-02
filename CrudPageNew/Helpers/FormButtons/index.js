import React from 'react';
import { Button, FormGroup } from 'react-bootstrap';

export default function FormButtons(props) {
    return (
        <FormGroup style={{ marginTop: '10px', float: 'right' }}>
            {props.enableBtnSave && 
                <Button size="sm" variant="success" onClick={props.handleSave}>Salvar</Button>
            }
            &nbsp;
            {props.enableBtnCancel && 
                <Button size="sm" variant="warning" onClick={props.handleCancel}>Cancelar</Button>
            }
        </FormGroup>
    );
}

FormButtons.defaultProps = {
    enableBtnSave: true,
    enableBtnCancel: true,
};