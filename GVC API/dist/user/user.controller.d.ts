import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getHello(): Promise<any>;
    getAllAccount(): Promise<any>;
    getAccount(id: string): Promise<any>;
    addAccount(body: any): Promise<any>;
    setOnLeave(id: string, status: any): Promise<any>;
    setResigned(id: string, status: any): Promise<any>;
    deleteAccount(id: string): Promise<any>;
}
