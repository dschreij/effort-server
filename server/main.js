import { Meteor } from 'meteor/meteor';

import '/imports/collections/Time';
import '/imports/publications/Time';
import '/imports/methods/updateTime';

import '/imports/collections/Sessions';
import '/imports/publications/Sessions';
import '/imports/methods/Sessions';

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
