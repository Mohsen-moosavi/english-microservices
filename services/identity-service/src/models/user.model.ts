import { DataTypes, Model, Optional } from "sequelize";
import { db } from "@/configs/database";
import { Role } from "./role.modle";

interface UserAttributes {
    id: number;
    username: string;
    password: string;
    phone: string;
    roleId: number;
    deletedAt: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" > { }

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    declare id: number;
    declare username: string;
    declare password: string;
    declare phone: string;
    declare deletedAt: Date | null;
    declare roleId: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING(13),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: "deleted_at", // 🔑 نام واقعی ستون در دیتابیس
            allowNull: true,
        },
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "role_id"
        }
    },
    {
        sequelize: db,
        tableName: "users",
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            { fields: ["role_id"] },
        ],
    }
);


Role.hasMany(User, { foreignKey: "roleId", as: "users" });
User.belongsTo(Role, { foreignKey: "roleId", as: "role"})