"""your_migration_message

Revision ID: 7b3d7b7b7c07
Revises: 9a1c0704a351
Create Date: 2024-09-21 16:02:59.110670

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7b3d7b7b7c07'
down_revision: Union[str, None] = '9a1c0704a351'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
