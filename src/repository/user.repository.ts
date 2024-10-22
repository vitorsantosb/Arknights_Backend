import { IUser } from './dto/user.interface';
import { prisma } from '@database/prisma.database';


async function StoreUser(user: IUser) {
  return prisma.user.create(
    {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        chat_rooms: { connect: [] },
      },
    },
  );
}

async function GetUser(_id: string) {
  return prisma.user.findUnique({
    where: {
      id: _id,
    },
  });
}

async function GetUserDataWithEmail(_email: string) {
  return prisma.user.findUnique({
    where: {
      email: _email,
    },
  });
}

async function ExistsUserWithEmail(_email: string) {
  return prisma.user.findUnique({
    where: {
      email: _email,
    },
  });
}

async function ExistsAndGetUserWithId(_id: string) {
  return prisma.user.findUnique({
    where: {
      id: _id,
    },
  });
}

async function GetUsersListWithPagination(_page: number, _limit: number) {
  return prisma.user.findMany(
    {
      skip: _page,
      take: _limit,
    },
  );
}

async function GetUsersListWithPaginationBasedOnUsername(_page: number, _limit: number, _name: string) {
  return prisma.user.findMany(
    {
      skip: _page,
      take: _limit,
      where: {
        name: _name,
      },
    },
  );
}

async function GetUsersList(){
  return prisma.user.findMany();
}

async function CountUsersWithName(_name: string) {
  return prisma.user.count({
    where: {
      name: _name,
    },
  });
}

async function CountTotalUsers(){
  return prisma.user.count();
}

export {
  StoreUser,
  ExistsUserWithEmail,
  GetUser,
  GetUserDataWithEmail,
  ExistsAndGetUserWithId,
  GetUsersListWithPagination,
  GetUsersListWithPaginationBasedOnUsername,
  GetUsersList,
  CountTotalUsers,
  CountUsersWithName,
};

