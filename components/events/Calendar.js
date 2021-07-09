import * as React from 'react';
import Paper from '@material-ui/core/Paper';
//import TableCell from '@material-ui/core/TableCell';
import { darken, alpha, lighten } from '@material-ui/core/styles/colorManipulator';
//import Typography from '@material-ui/core/Typography';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
//import classNames from 'clsx';
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
//import ColorLens from '@material-ui/icons/ColorLens';
import { withStyles } from '@material-ui/core/styles';

import { owners } from '../../data/demo-data/tasks';
import { appointments } from '../../data/demo-data/tasks';

const resources = [{
  fieldName: 'ownerId',
  title: 'Owners',
  instances: owners,
}];

const getBorder = theme => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(alpha(theme.palette.divider, 1), 0.88)
    : darken(alpha(theme.palette.divider, 1), 0.68)
}`);

const DayScaleCell = props => (
  <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }} />
);

const styles = theme => ({
  cell: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: alpha('#03B0b5', 0.15),
    },
    '&:focus': {
      backgroundColor: alpha('#03B0b5', 0.30),
      outline: 0,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    padding: '0.5em',
    textAlign: 'center',
  },
  opacity: {
    opacity: '0.5',
  },
  appointment: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
  apptContent: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: 'none',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  tooltipText: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: 'middle',
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2)
  },
  container: {
    paddingBottom: theme.spacing(1.5)
  },
});

// #FOLD_BLOCK
// const CellBase = React.memo(({
//   classes,
//   startDate,
//   formatDate,
//   otherMonth,
//   // #FOLD_BLOCK
// }) => {
//   //const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
//   const isFirstMonthDay = startDate.getDate() === 1;
//   const formatOptions = isFirstMonthDay
//     ? { day: 'numeric', month: 'long' }
//     : { day: 'numeric' };
//   return (
//     <TableCell
//       tabIndex={0}
//       className={classNames({
//         [classes.cell]: true,
//         [classes.opacity]: otherMonth,
//       })}
//     >
//       <div className={classes.text}>
//         {formatDate(startDate, formatOptions)}
//       </div>
//     </TableCell>
//   );
// });

// const TimeTableCell = withStyles(styles, { name: 'Cell' })(CellBase);

const BooleanEditor = props => {
  return <AppointmentForm.BooleanEditor {...props} readOnly />;
};

const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={classes.appointment}
  />
));

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
  <Appointments.AppointmentContent {...restProps} className={classes.apptContent} />
));

const FlexibleSpace = withStyles(styles, { name: 'ToolbarRoot' })(({ classes, ...restProps }) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
      {/* <ColorLens fontSize="large" htmlColor="#FF7043" /> */}
      {/* <Typography variant="h5" style={{ marginLeft: '10px' }}>Community Calendar</Typography> */}
      <h1>Community Calendar</h1>
    </div>
  </Toolbar.FlexibleSpace>
));

export default class Calendar extends React.PureComponent {
  // #FOLD_BLOCK
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: '2018-07-17',
      
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  // #FOLD_BLOCK
  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { 
      currentDate, data, addedAppointment, appointmentChanges, editingAppointment,
    } = this.state;

    return (
      <Paper value=''>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate={currentDate}
          />
                  
          <EditingState
            onCommitChanges={this.commitChanges}

            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}

            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}

            editingAppointment={editingAppointment}
            oneditingappointmentchange={this.changeeditingappointment}
          />

          <MonthView
            title="month"
            selectedDateFormat="{0:M}"
            selectedShortDateFormat="{0:M}"    
            dayScaleCellComponent={DayScaleCell}
          />

          <Toolbar
            flexibleSpaceComponent={FlexibleSpace}
          /> 
          <DateNavigator /> 
          <EditRecurrenceMenu value='1'/> 
          <ConfirmationDialog />
          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />
          <Resources
            data={resources}
          />
          <AppointmentTooltip
            showCloseButton
            showDeleteButton
            showOpenButton
          />
          <AppointmentForm booleanEditorComponent={BooleanEditor} />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
