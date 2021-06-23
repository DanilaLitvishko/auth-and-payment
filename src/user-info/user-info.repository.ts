import { EntityRepository, Repository } from "typeorm";
import { UserInfo } from "./user-info.entity";

@EntityRepository(UserInfo)
export class UserInfoRepository extends Repository<UserInfo>{

}