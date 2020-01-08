import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { HistoryContext } from 'react-mega-router';

export default function NewButton(originalProps) {
   const { history } = useContext(HistoryContext);
   const props = { ...originalProps };
   delete props.href;
   delete props.to;
   delete props.path;

   const onClick = e => {
      if (props.onClick) props.onClick(e);
      if (history && history.push && (originalProps.to || originalProps.href || originalProps.path)) {
         history.push(originalProps.to || originalProps.href || originalProps.path);
      } 
   };

   const Cpn = props.component || Button;

   return <Cpn {...props} onClick={onClick} />;
}
