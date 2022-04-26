import React from 'react';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { View, Text, Button, NativeModules, TurboModuleRegistry} from 'react-native'
import { TaskManagerTaskExecutor } from 'expo-task-manager';
import { sessionStorage } from '../../classes/Storage';
import haversine from 'haversine';

const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';


  const startLocationTrackingAsync = async () => {
    console.log('starting location Tracking')
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      
      sessionStorage.setItem('coords', {})
      sessionStorage.setItem('startingTime', new Date())
      await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1, // minimum change (in meters) betweens updates
        deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
        // foregroundService is how you get the task to be updated as often as would be if the app was open
        foregroundService: {
          notificationTitle: 'Using your location',
          notificationBody: 'To turn off, go back to the app and switch something off.',
        },
      });
    }
  };

  const stopLocationTrackingAsync = async () => {
    console.log('stopping location Tracking')
    Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then((value) => {
      if (value) {
        Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
      }
    });
  }

TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
  if (error) {
    console.error(error);
    return;
  } else {
    console.log('location updated')
    let allCoords = []
    let km = 0

    const currCoords = locations[0].coords
    const lastCoords = sessionStorage.getItem('coords')


    if (lastCoords && lastCoords.coords) {lastCoords.coords.forEach(item => allCoords.push(item)) }
    allCoords.push(currCoords)

    if (allCoords.length > 1 ) {
      if (lastCoords.runLength) km = lastCoords.runLength + haversine(allCoords[allCoords.length - 2], allCoords[allCoords.length - 1], {unit: 'meter'})
      else km = haversine(allCoords[allCoords.length - 2], allCoords[allCoords.length - 1], {unit: 'meter'})
    }

    sessionStorage.setItem('coords', {coords: allCoords, runLength: km})
    
  }
})

export { startLocationTrackingAsync, stopLocationTrackingAsync }