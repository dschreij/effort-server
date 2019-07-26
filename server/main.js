import { Meteor } from 'meteor/meteor';

import Time from '../imports/collections/Time';
import Sessions from '../imports/collections/Sessions.js';

Meteor.methods({
  UpdateTime() {
    Time.upsert('currentTime', { $set: { time: new Date() } });
  },
  deleteSession(_id) {
    check(_id, Meteor.Collection.ObjectID);
    Sessions.remove({ _id });
  },
});

Meteor.publish('Sessions', function () {
  return Sessions.find({});
});

Meteor.publish('Time', function () {
  return Time.find({});
});

Meteor.startup(() => {
  // Update the current time
  Meteor.call('UpdateTime');

  // if (!Sessions.find().count()) {
  //   const _id = Sessions.insert({
  //     status: 1,
  //     first_name: 'Daniel',
  //     last_name: 'Schreij',
  //     number: 12334,
  //     cabin: 123,
  //     ID: 12345,
  //   });
  //   console.log(`Inserted record with id: ${_id}`);
  // }
});
