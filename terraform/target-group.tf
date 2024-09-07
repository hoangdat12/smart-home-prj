resource "aws_lb_target_group" "ecs_tg" {
  name        = "ECS-tg"
  port        = "80"
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.ecs_vpc.id

  health_check {
    interval            = 30               # Thời gian giữa các lần kiểm tra (giây)
    path                = "/heal"              # Đường dẫn API cho health check
    protocol            = "HTTP"           # Giao thức sử dụng cho health check
    timeout             = 5                # Thời gian chờ cho phản hồi health check (giây)
    healthy_threshold   = 2                # Số lần thành công để coi là healthy
    unhealthy_threshold = 2                # Số lần thất bại để coi là unhealthy
    matcher             = "200-299"        # Mã trạng thái HTTP coi là thành công
  }

  tags = {
    Name = "ECS-tg"
  }
}

resource "aws_lb_target_group" "backend_tg" {
  name        = "Backend-tg"
  port        = "8000"
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.ecs_vpc.id

  health_check {
    interval            = 30               # Thời gian giữa các lần kiểm tra (giây)
    path                = "/api/v1/"              # Đường dẫn API cho health check
    protocol            = "HTTP"           # Giao thức sử dụng cho health check
    timeout             = 5                # Thời gian chờ cho phản hồi health check (giây)
    healthy_threshold   = 2                # Số lần thành công để coi là healthy
    unhealthy_threshold = 2                # Số lần thất bại để coi là unhealthy
    matcher             = "200-299"        # Mã trạng thái HTTP coi là thành công
  }

  tags = {
    Name = "Backend-tg"
  }
}