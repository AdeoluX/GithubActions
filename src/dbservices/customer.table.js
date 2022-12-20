const User = require('../models/User');

class CustomerRepo {
  customerCreate = async (data) => {
    const customer = await new User(data).save();
    return customer;
  };

  findCustomer = async (condition) => {
    const property = await User.findOne(condition);
    return property;
  };

  findUsersGroups = async (condition) => {
    const user = await User.findOne(condition).populate({
      path: 'groups',
      model: 'Group',
      populate: {
        path: 'users',
        model: 'User',
        select: 'firstname lastname',
      },
    });
    return user;
  };

  searchCustomerByEmail = async (email, email2) => {
    let users
    if(email){
      users = await User.find({$and: [{ email: { $regex: '.*' + email + '.*' } }, { email: { $ne: email2 } }]  });  
    }else{
      users = await User.find({email: {$ne: email2}})
    }
    return users;
  };
}

module.exports = {
  CustomerRepo,
};
