import { DataTypes, Model } from "sequelize";
import { db } from "@/configs/database";

export class Permission extends Model {
    declare id: number;
    declare permissionKey: string;
    declare description: string;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        permissionKey: {
            type: DataTypes.STRING(40),
            allowNull: false,
            field: "permission_ey",
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        sequelize: db,
        tableName: "permissions",
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);