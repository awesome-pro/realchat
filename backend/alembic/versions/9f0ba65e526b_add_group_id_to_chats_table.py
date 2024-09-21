"""Add group_id to chats table

Revision ID: 9f0ba65e526b
Revises: 7b3d7b7b7c07
Create Date: 2024-09-21 17:24:19.433224

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '9f0ba65e526b'
down_revision: Union[str, None] = '7b3d7b7b7c07'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('chats', sa.Column('group_id', sa.Integer(), nullable=True))
    op.add_column('chats', sa.Column('sender_name', sa.String(), nullable=True))
    op.add_column('chats', sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.alter_column('chats', 'message',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               existing_nullable=True)
    op.create_foreign_key(None, 'chats', 'groups', ['group_id'], ['id'])
    op.drop_column('chats', 'timestamp')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('chats', sa.Column('timestamp', postgresql.TIMESTAMP(timezone=True), server_default=sa.text('now()'), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'chats', type_='foreignkey')
    op.alter_column('chats', 'message',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               existing_nullable=True)
    op.drop_column('chats', 'created_at')
    op.drop_column('chats', 'sender_name')
    op.drop_column('chats', 'group_id')
    # ### end Alembic commands ###
