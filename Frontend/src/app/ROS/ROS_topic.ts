import { Injectable } from "@angular/core";

Injectable({
  providedIn: 'root'
})

//test
const rosnodejs = require('rosnodejs');
// Requires the std_msgs message package
const std_msgs = rosnodejs.require('std_msgs').msg;

export class RosTopic{

    listener(topicName:String) {
        // Register node with ROS master
        rosnodejs.initNode('/listener_node')
          .then((rosNode:any) => {
            // Create ROS subscriber on the 'chatter' topic expecting String messages
            let sub = rosNode.subscribe(topicName, std_msgs.String,
              (data:any) => { // define callback execution
                rosnodejs.log.info('I heard: [' + data.data + ']');
                return data.data
              }
            );
          });

}



}

