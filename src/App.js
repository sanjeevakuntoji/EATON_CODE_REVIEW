/* React core module imports */
import React from 'react';

/* Scorecard and relavent imports */
import Hero from '@pxblue/react-components/core/Hero';
import HeroBanner from '@pxblue/react-components/core/HeroBanner';
import InfoListItem from '@pxblue/react-components/core/InfoListItem';
import ScoreCard from '@pxblue/react-components/core/ScoreCard';

/* icons, colors,Components*/
import * as Colors from '@pxblue/colors';
import { Flow, GasCylinder, Temp, Moisture as Humidity } from '@pxblue/icons-mui';
import { ChevronRight, MoreVert, Info, CloudCircle, NotificationsActive, Notifications } from '@material-ui/icons';
import { List, ListItem, ListItemText, ListItemSecondaryAction,Grid } from '@material-ui/core';

/* background image for score card header */
import backgroundImage from './shared/topology_40.png';

/*data*/
import Data from './shared/Data.json';
import { Labels, Units, Defaults} from './shared/Constant';

/*import css modules */
import styles from './App.module.css'


export default () => {
	const scoreCardList = Data.map((item, index) => {
		const {title,alarmCount,subtitle,deviceCount,eventCount,values,commStatus} = item;
		const weatherValue = Object.keys(values);
		
		const Config = {
			temperature: { 
				tempIcon:<Temp fontSize={'inherit'} htmlColor={Colors.black[500]} />,
				unit: Units.Temperature
			},
			flow: {
				flowIcon: <Flow fontSize={'inherit'} htmlColor={Colors.black[500]} />,
				unit: Units.Flow
			},
			humidity: {
				HumidityIcon: <Humidity fontSize={'inherit'} htmlColor={eventCount > 0 ? Colors.blue[500] : Colors.black[500]}/>,
				unit: Units.Humidity
			},
			gasCylinder: {
				GasCylinderIcon: <GasCylinder fontSize={'inherit'} htmlColor={Colors.black[500]}/>,
				unit: Units.Volume
			},
			alarm: {
				color: alarmCount > 0 ? Colors.red[500] : Colors.black[500] ,
				icon: alarmCount > 0 ? <NotificationsActive /> : <Notifications />,
				title: alarmCount < 1 ? Defaults.alarm :( alarmCount> 1 ? alarmCount + Labels.Alarms: alarmCount+ Labels.Alarm)
			},
			event: {
				color:eventCount > 0 ? Colors.blue[500] : Colors.black[500] ,
				title: eventCount < 1 ? Defaults.event : (eventCount > 1 ? eventCount + Labels.Events : eventCount + Labels.Event)
			}
		}
		
		return (
			<Grid className={styles.grid_item} item key={index} lg={4} md={4} sm={6} xs={12}>
				<ScoreCard
					headerColor={alarmCount > 0 ? Colors.red[500] : Colors.blue[500]}
					headerBackgroundImage={backgroundImage}
					headerTitle={title}
					headerSubtitle={subtitle}
					headerInfo={deviceCount > 0 ? deviceCount + Labels.Device : Defaults.device }
					headerFontColor={Colors.white[50]}
					actionItems={[ <MoreVert onClick={() => {}} /> ]}
					badge={
						<HeroBanner>
							<Hero
								icon={weatherValue[0] === Labels.Temperature ? Config.temperature.tempIcon : Config.gasCylinder.GasCylinderIcon}
								label={weatherValue[0]}
								iconSize={48}
								value={values[weatherValue[0]]}
								units={weatherValue[0] === Labels.Temperature ? Config.temperature.unit: Config.gasCylinder.unit}
							/>
							<Hero
								icon={weatherValue[1] === Labels.Humidity ? Config.humidity.HumidityIcon :Config.flow.flowIcon}
								label={weatherValue[1]}
								value={values[weatherValue[1]]}
								units={weatherValue[1] === Labels.Humidity  ? Config.humidity.unit : Config.flow.unit}
								iconSize={48}
							/>
						</HeroBanner>
					}
					badgeOffset={0}
					actionRow={
						<List>
							<ListItem>
								<ListItemText primary={Labels.Location} />
								<ListItemSecondaryAction>
									<ChevronRight />
								</ListItemSecondaryAction>
							</ListItem>
						</List>
					}
				>
					<List className={styles.list_item}>
						<InfoListItem
							style={{ height: 36}}
							fontColor={Config.alarm.color}
							iconColor={Config.alarm.color}
							title={Config.alarm.title}
							icon={Config.alarm.icon}
						/>
						<InfoListItem
							style={{ height: 36}}
							fontColor={Config.event.color}
							iconColor={Config.event.color}
							title={Config.event.title}
							icon={<Info />}
						/>
						<InfoListItem style={{ height: 36}} title={commStatus} icon={<CloudCircle />} />
					</List>
				</ScoreCard>
			</Grid>
		);
	});
	return (
		<Grid container>
		  <div style={{ display: 'flex', maxWidth: '1200px', flexWrap: 'wrap', margin:' 0 auto' }}>{scoreCardList}</div>
		</Grid>
	);
};
 