import pytest
from unittest.mock import MagicMock
from psycopg2 import OperationalError as Psycopg2Error
from django.core.management import call_command
from django.db.utils import OperationalError

@pytest.mark.django_db
class TestCommand:
    """
    Test Commands using pytest.
    """

    def test_wait_for_db_ready(self, monkeypatch):
        """Test waiting for database if database ready"""

        mock_check = MagicMock(return_value=True)  # 这里使用unittest.mock中的MagicMock
        monkeypatch.setattr('nybusy.management.commands.wait_for_db.Command.check', mock_check)

        call_command('wait_for_db')

        mock_check.assert_called_once_with(databases=['default'])

    def test_wait_for_db_delay(self, monkeypatch):
        """Test waiting for database when getting OperationalError"""

        mock_check = MagicMock(side_effect=[Psycopg2Error]*2 + [OperationalError]*3 + [True])  # 同上
        monkeypatch.setattr('nybusy.management.commands.wait_for_db.Command.check', mock_check)

        mock_sleep = MagicMock()  # 同上
        monkeypatch.setattr('time.sleep', mock_sleep)

        call_command('wait_for_db')

        assert mock_check.call_count == 6
        mock_check.assert_called_with(databases=['default'])
