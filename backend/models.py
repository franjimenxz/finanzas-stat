from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.hybrid import hybrid_property
from extensions import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    legajo = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    usuario = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    _contrasena = db.Column('contrasena', db.String(255), nullable=False)  
    rol = db.Column(db.String(50), nullable=False, default='usuario')
    activo = db.Column(db.Boolean, default=True, nullable=False)
    
    @hybrid_property
    def contrasena(self):
        raise AttributeError("La contraseña no se puede acceder directamente.")
    
    @contrasena.setter
    def contrasena(self, password):
        self._contrasena = generate_password_hash(password)

    def verificarcontrasena(self, password):
        return check_password_hash(self._contrasena, password) 

    def desactivar(self):
        """Marca al usuario como inactivo."""
        self.activo = False
        db.session.commit()

    def reactivar(self):
        """Reactiva al usuario."""
        self.activo = True
        db.session.commit()
        
        
class Categoria(db.Model):
    __tablename__ = 'categorias'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)  # "Ingreso" o "Egreso"

    @classmethod
    def obtener_por_tipo(cls, tipo):
        return cls.query.filter_by(tipo=tipo).all()

    @classmethod
    def crear(cls, nombre, tipo):
        nueva_categoria = cls(nombre=nombre, tipo=tipo)
        db.session.add(nueva_categoria)
        db.session.commit()
        return nueva_categoria

class MetodoPago(db.Model):
    __tablename__ = 'metodopago'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)

class Ingreso(db.Model):
    __tablename__ = 'ingresos'
    codigo = db.Column(db.Integer, primary_key=True)
    idcategoria = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)
    legajousuario = db.Column(db.Integer, db.ForeignKey('usuarios.legajo'), nullable=False)
    descripcion = db.Column(db.String(255))
    fecha = db.Column(db.Date, default=datetime.utcnow)
    importe = db.Column(db.Float, nullable=False)

    categoria = db.relationship('Categoria', backref='ingresos')
    usuario = db.relationship('Usuario', backref='ingresos')

    @property
    def categoria_nombre(self):
        return self.categoria.nombre if self.categoria else "Sin categoría"
    
class Egreso(db.Model):
    __tablename__ = 'egresos'
    codigo = db.Column(db.Integer, primary_key=True)
    idcategoria = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)
    legajousuario = db.Column(db.Integer, db.ForeignKey('usuarios.legajo'), nullable=False)
    descripcion = db.Column(db.String(255))
    fecha = db.Column(db.Date, default=datetime.utcnow)
    importe = db.Column(db.Float, nullable=False)
    idMetodoPago = db.Column(db.Integer, db.ForeignKey('metodopago.id'), nullable=False)

    categoria = db.relationship('Categoria', backref='egresos')
    usuario = db.relationship('Usuario', backref='egresos')
    metodo_pago = db.relationship('MetodoPago', backref='egresos')

    @property
    def categoria_nombre(self):
        return self.categoria.nombre if self.categoria else "Sin categoría"
    
class Reporte(db.Model):
    __tablename__ = 'reportes'
    id = db.Column(db.Integer, primary_key=True)
    legajousuario = db.Column(db.Integer, db.ForeignKey('usuarios.legajo'), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    fecha_reporte = db.Column(db.DateTime, default=datetime.utcnow)
    estado = db.Column(db.String(50), default="pendiente")

    usuario = db.relationship('Usuario', backref='reportes')

    @classmethod
    def crear(cls, legajousuario, descripcion):
        nuevo_reporte = cls(legajousuario=legajousuario, descripcion=descripcion)
        db.session.add(nuevo_reporte)
        db.session.commit()
        return nuevo_reporte

    @classmethod
    def obtener_por_usuario(cls, legajousuario):
        return cls.query.filter_by(legajousuario=legajousuario).all()

    @classmethod
    def actualizar_estado(cls, reporte_id, nuevo_estado):
        reporte = cls.query.get(reporte_id)
        if reporte:
            reporte.estado = nuevo_estado
            db.session.commit()
            return reporte
        return None
