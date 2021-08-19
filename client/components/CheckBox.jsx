import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Box } from '@material-ui/core/Box';

export default function CheckBox(props) {

  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" column = "true">
          <FormControlLabel
            value="start"
            checked={props.checked}
            control={<Checkbox color="primary" />}
            label={props.checkPrompt}
            labelPlacement="start"
            onClick={props.onClickFunction}
          />
      </FormGroup>
    </FormControl>
  );
}