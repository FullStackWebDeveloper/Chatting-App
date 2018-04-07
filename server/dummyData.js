import Workspace from './models/workspace';
import User from './models/user';
import Room from './models/room';
import cuid from 'cuid';

export default function () {
  // Workspace.count().exec((err, count) => {
  //   if (count > 0) {
  //     return;
  //   }

  //   const workspace1 = new Workspace({ full_name: 'Global', display_name: 'GLOBAL', cuid: cuid(), admin_user: "admin" });
  //   const workspace2 = new Workspace({ full_name: 'Guest', display_name: 'GUEST', cuid: cuid(), admin_user: "admin" });

  //   Workspace.create([workspace1,workspace2], (error) => {
  //     if(error) {
  //       console.log(error)
  //     }
  //     if (!error) {
  //       console.log('ready to go....');
  //     }
  //   });
  // });

  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const testUser = new User({ username: 'test', email: 'test@test.com', password: 'testuser', cuid: 'cikqgkv4q01ck7453ualdn3hh' });

    User.create([testUser], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });

  // Room.count().exec((err, count) => {
  //   if (count > 0) {
  //     return;
  //   }
  //   const generalRoom = new Room({
  //     owner: "admin",
  //     channel_id: cuid(),
	//     members: ['general'],
  //     title: "General"
  //   });

  //   Room.create([generalRoom], (error) => {
  //     if (error) {
  //       console.log(error)
  //     }
  //   });
}
