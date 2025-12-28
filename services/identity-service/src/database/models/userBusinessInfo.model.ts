import { DataTypes, Model, Optional } from "sequelize";
import { db } from "@/configs/database";
import { User } from "./user.model";

interface UserBusinessInfoAttributes {
    id: number;
    avgCommentScore: number | null;
    courseCount: number;
    commentCount: number;
    purchaseCount: number;
    ticketCount: number;
    lessonCount: number;
    articleCount: number;
    purchaseAmount: number;
    userId: number;
}

interface UserBusinessInfoCreationAttributes extends Optional<UserBusinessInfoAttributes, "id"> { }

export class UserBusinessInfo extends Model<UserBusinessInfoAttributes, UserBusinessInfoCreationAttributes>
    implements UserBusinessInfoAttributes {
    declare id: number;
    declare avgCommentScore: number | null;
    declare courseCount: number;
    declare commentCount: number;
    declare purchaseCount: number;
    declare ticketCount: number;
    declare lessonCount: number;
    declare articleCount: number;
    declare purchaseAmount: number;
    declare userId: number;
}

UserBusinessInfo.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        avgCommentScore: {
            type: DataTypes.DECIMAL(3,2),
            allowNull: true,
            field: "avg_comment_score"
        },
        courseCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            field: "course_count"
        },
        commentCount:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            defaultValue: 0,
            field: "comment_count"
        },
        purchaseCount:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            defaultValue: 0,
            field: "purchase_count"
        },
        lessonCount:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            defaultValue: 0,
            field: "lesson_count"
        },
        ticketCount:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            defaultValue: 0,
            field: "ticket_count"
        },
        articleCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            defaultValue: 0,
            field: "article_count"
        },
        purchaseAmount: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull:false,
            defaultValue: 0,
            field: "purchase_amount"
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "user_id",
            references: {
                model: User,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            unique: true
        },
    },
    {
        sequelize: db,
        tableName: "user_business_infos",
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);


User.hasOne(UserBusinessInfo, { foreignKey: "userId", as: "businessInfo" });
UserBusinessInfo.belongsTo(User, { foreignKey: "userId", as: "user" })