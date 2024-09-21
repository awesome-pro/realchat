"""your_migration_message

Revision ID: 8c0f809596de
Revises: 63472017d591
Create Date: 2024-09-21 12:11:22.948100

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8c0f809596de'
down_revision: Union[str, None] = '63472017d591'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
