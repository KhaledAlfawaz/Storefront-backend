import { userModel, user } from '../../models/users';

const user = new userModel();

const testUser: user = {
  firstname: 'Test firstname',
  lastname: 'Test lastname',
  password: 'testpassword',
};

describe('User Modle', () => {
  it('create method test', async () => {
    const result = await user.create(testUser);
    const { firstname, lastname } = result;
    expect({ firstname, lastname }).toEqual({
      firstname: testUser.firstname,
      lastname: testUser.lastname,
    });
  });

  it('index method test', async () => {
    const result = await user.index();
    const { firstname, lastname } = result[0];
    expect({ firstname, lastname }).toEqual({
      firstname: testUser.firstname,
      lastname: testUser.lastname,
    });
  });

  it('show method test', async () => {
    const result = await user.show('1');
    const { firstname, lastname } = result;
    expect({ firstname, lastname }).toEqual({
      firstname: testUser.firstname,
      lastname: testUser.lastname,
    });
  });
});
