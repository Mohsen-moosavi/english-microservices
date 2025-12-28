import { DataTypes, Model } from "sequelize";
import { Permission } from "./permission.model";
import { Role } from "./role.modle";
import { db } from "@/configs/database";

export class RolePermission extends Model {
    declare roleId: number;
    declare permissionId: number;
}

RolePermission.init(
    {
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Role,
                key: "id"
            },
            field: "role_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        permissionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Permission,
                key: "id"
            },
            field: "permission_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
    },
    {
        sequelize: db,
        tableName: "role_permissions",
        timestamps: true
    }
);

Role.belongsToMany(Permission, { through: RolePermission, as: "permissions", foreignKey: "role_id" });
Permission.belongsToMany(Role, { through: RolePermission, as: "roles", foreignKey: "permission_id" });
